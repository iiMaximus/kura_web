// App shell — navigation + tweaks wiring

const { useState: useS, useEffect: useE } = React;

function App() {
  const [screen, setScreen] = useS(() => localStorage.getItem('allergify:screen') || 'home');
  const [tweaks, setTweaks] = useS(window.TWEAKS);
  const [editMode, setEditMode] = useS(false);

  useE(() => { localStorage.setItem('allergify:screen', screen); }, [screen]);

  // Tweak protocol
  useE(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || !d.type) return;
      if (d.type === '__activate_edit_mode') setEditMode(true);
      if (d.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const handleTweak = (key, val) => {
    const next = { ...tweaks, [key]: val };
    setTweaks(next);
    window.TWEAKS = next;
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: { [key]: val },
    }, '*');
  };

  // Force re-render of screens on tweaks change — tokens read from window.TWEAKS
  const tweaksKey = `${tweaks.palette}-${tweaks.layout}-${tweaks.density}`;

  const { pal } = useTokens();

  return (
    <div data-screen-label={`01 ${screen}`}>
      <IOSDevice width={402} height={874}>
        <div key={tweaksKey} style={{
          position: 'relative', width: '100%', height: '100%',
          background: pal.bg,
          overflow: 'hidden',
        }}>
          <div style={{ height: '100%', overflow: 'auto', position: 'relative' }}>
            {screen === 'home' && (
              <HomeScreen
                onScan={() => setScreen('scan')}
                onOpenResult={() => setScreen('result')}
              />
            )}
            {screen === 'scan' && (
              <ScanScreen
                onCancel={() => setScreen('home')}
                onDetected={() => setScreen('result')}
              />
            )}
            {screen === 'result' && (
              <ResultScreen
                onBack={() => setScreen('home')}
                onIngredients={() => setScreen('ingredients')}
              />
            )}
            {screen === 'ingredients' && (
              <IngredientsScreen onBack={() => setScreen('result')}/>
            )}
            {screen === 'pantry' && (
              <PantryScreen onOpenResult={() => setScreen('result')}/>
            )}
            {screen === 'learn' && (
              <LearnScreen/>
            )}
          </div>

          {screen !== 'scan' && (
            <TabBar active={
              screen === 'home' ? 'home'
              : screen === 'pantry' || screen === 'ingredients' ? 'pantry'
              : screen === 'learn' ? 'learn'
              : 'home'
            } onTab={(k) => {
              if (k === 'scan') setScreen('scan');
              else if (k === 'home') setScreen('home');
              else if (k === 'pantry') setScreen('pantry');
              else if (k === 'learn') setScreen('learn');
              else if (k === 'profile') setScreen('home');
            }}/>
          )}
        </div>
      </IOSDevice>

      <TweaksPanel
        enabled={editMode}
        tweaks={tweaks}
        onChange={handleTweak}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

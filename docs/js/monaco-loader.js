/**
 * Nostromo Theme - Monaco Editor Loader
 * Provides live theme preview functionality
 */

(function() {
  'use strict';

  // Monaco Editor instance
  let editor = null;
  let isMonacoLoaded = false;

  // Sample TypeScript code for preview
  const sampleCode = `/**
 * NOSTROMO - Commercial Towing Vehicle
 * Registration: 180924609
 * 
 * A retro-futuristic theme inspired by the Alien universe
 */

import { Spacecraft } from 'uscss-nostromo';

class Nostromo extends Spacecraft {
    private crew: CrewMember[];
    private cargo: MineralOre[];
    private status: ShipStatus;
    
    constructor(registry: string) {
        super(registry);
        this.crew = [];
        this.cargo = [];
        this.status = ShipStatus.DOCKED;
    }
    
    // Lifecycle functions
    public async wakeCrew(): Promise<void> {
        console.log("Mother: Crew awakening initiated...");
        
        for (const member of this.crew) {
            await member.revive();
            this.logAction(\`Crew member \${member.name} revived\`);
        }
        
        this.status = ShipStatus.ACTIVE;
    }
    
    public investigateSignal(coordinates: Coordinates): Promise<Discovery> {
        // Sometimes it's best to not investigate...
        return new Promise((resolve, reject) => {
            const discovery = this.explore(coordinates);
            
            if (discovery.type === LifeformType.XENOMORPH) {
                this.logWarning("DANGER: Unknown lifeform detected!");
                this.status = ShipStatus.DISTRESS;
            }
            
            resolve(discovery);
        });
    }
    
    // Syntax highlighting demonstration
    private logAction(message: string): void {
        const timestamp = new Date().toISOString();
        const entry: LogEntry = {
            timestamp,
            level: LogLevel.INFO,
            message,
            source: 'NOSTROMO_SYSTEM'
        };
        
        this.systemLogs.push(entry);
    }
    
    // String interpolation
    public getStatus(): string {
        return \`Ship: Nostromo
Status: \${this.status}
Crew: \${this.crew.length} members
Cargo: \${this.cargo.length} tons
Location: \${this.currentLocation}\`;
    }
}

// Initialize the ship
const nostromo = new Nostromo("180924609");
export default nostromo;`;

  // Theme definitions for Monaco
  const themes = {
    'nostromo-dark': {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6ba3a5', fontStyle: 'italic' },
        { token: 'comment.doc', foreground: '6ba3a5', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'dd513c' },
        { token: 'keyword.control', foreground: 'dd513c' },
        { token: 'keyword.operator', foreground: 'A5FBFF' },
        { token: 'operator', foreground: 'A5FBFF' },
        { token: 'namespace', foreground: '3df2ad' },
        { token: 'variable', foreground: 'A5FBFF' },
        { token: 'variable.parameter', foreground: '92dde1' },
        { token: 'variable.readonly', foreground: '3df2ad' },
        { token: 'type', foreground: '4DDCFF' },
        { token: 'class', foreground: '4DDCFF' },
        { token: 'interface', foreground: '4DDCFF' },
        { token: 'function', foreground: '3df2ad' },
        { token: 'function.call', foreground: '3df2ad' },
        { token: 'string', foreground: '3f9bbc' },
        { token: 'string.escape', foreground: 'eb78c3' },
        { token: 'number', foreground: '4DDCFF' },
        { token: 'constant', foreground: '3df2ad' },
        { token: 'property', foreground: '92dde1' },
        { token: 'property.readonly', foreground: '3df2ad' },
        { token: 'decorator', foreground: 'FFFF84' },
        { token: 'tag', foreground: 'dd513c' },
        { token: 'attribute.name', foreground: '3df2ad' },
        { token: 'attribute.value', foreground: '3f9bbc' },
        { token: 'invalid', foreground: 'dd513c' },
        { token: 'meta', foreground: 'A5FBFF' },
        { token: 'regexp', foreground: 'FFFF84' },
      ],
      colors: {
        'editor.background': '#141D22',
        'editor.foreground': '#A5FBFF',
        'editorLineNumber.foreground': '#3a4c4e',
        'editorLineNumber.activeForeground': '#A5FBFF',
        'editorCursor.foreground': '#A5FBFF',
        'editor.lineHighlightBackground': '#1a252b',
        'editor.lineHighlightBorder': '#154547',
        'editor.selectionBackground': '#154547',
        'editor.selectionHighlightBackground': '#1e2f33',
        'editor.findMatchBackground': '#365878',
        'editor.findMatchHighlightBackground': '#36587880',
        'editorBracketMatch.background': '#154547',
        'editorBracketMatch.border': '#3f9bbc',
        'editorHoverWidget.background': '#141D22',
        'editorHoverWidget.border': '#154547',
        'editorWidget.background': '#141D22',
        'editorWidget.border': '#154547',
        'editorSuggestWidget.background': '#141D22',
        'editorSuggestWidget.border': '#154547',
        'editorSuggestWidget.highlightForeground': '#3df2ad',
        'editorSuggestWidget.selectedBackground': '#154547',
        'editorIndentGuide.background': '#1a252b',
        'editorIndentGuide.activeBackground': '#3f9bbc',
        'editorRuler.foreground': '#1a252b',
        'editorCodeLens.foreground': '#3a4c4e',
      }
    },
    'nostromo-dark-modern': {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '5a8c8d', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'E85A45' },
        { token: 'keyword.control', foreground: 'E85A45' },
        { token: 'keyword.operator', foreground: 'A5FBFF' },
        { token: 'operator', foreground: 'A5FBFF' },
        { token: 'namespace', foreground: '4DFFA8' },
        { token: 'variable', foreground: 'A5FBFF' },
        { token: 'variable.parameter', foreground: '9AEBF0' },
        { token: 'variable.readonly', foreground: '4DFFA8' },
        { token: 'type', foreground: '7AEBFF' },
        { token: 'class', foreground: '7AEBFF' },
        { token: 'interface', foreground: '7AEBFF' },
        { token: 'function', foreground: '4DFFA8' },
        { token: 'function.call', foreground: '4DFFA8' },
        { token: 'string', foreground: '5AC0FF' },
        { token: 'string.escape', foreground: 'F090D0' },
        { token: 'number', foreground: '7AEBFF' },
        { token: 'constant', foreground: '4DFFA8' },
        { token: 'property', foreground: '9AEBF0' },
        { token: 'property.readonly', foreground: '4DFFA8' },
        { token: 'decorator', foreground: 'D4C440' },
        { token: 'tag', foreground: 'E85A45' },
        { token: 'attribute.name', foreground: '4DFFA8' },
        { token: 'attribute.value', foreground: '5AC0FF' },
        { token: 'invalid', foreground: 'E85A45' },
        { token: 'meta', foreground: 'A5FBFF' },
        { token: 'regexp', foreground: 'D4C440' },
      ],
      colors: {
        'editor.background': '#1A2026',
        'editor.foreground': '#A5FBFF',
        'editorLineNumber.foreground': '#4A5A5C',
        'editorLineNumber.activeForeground': '#A5FBFF',
        'editorCursor.foreground': '#A5FBFF',
        'editor.lineHighlightBackground': '#252D35',
        'editor.lineHighlightBorder': '#35454A',
        'editor.selectionBackground': '#35454A',
        'editor.selectionHighlightBackground': '#2A353C',
        'editor.findMatchBackground': '#4A6A8C',
        'editor.findMatchHighlightBackground': '#4A6A8C80',
        'editorBracketMatch.background': '#35454A',
        'editorBracketMatch.border': '#4A9AC0',
        'editorHoverWidget.background': '#252D35',
        'editorHoverWidget.border': '#35454A',
        'editorWidget.background': '#252D35',
        'editorWidget.border': '#35454A',
        'editorSuggestWidget.background': '#252D35',
        'editorSuggestWidget.border': '#35454A',
        'editorSuggestWidget.highlightForeground': '#4DFFA8',
        'editorSuggestWidget.selectedBackground': '#35454A',
        'editorIndentGuide.background': '#252D35',
        'editorIndentGuide.activeBackground': '#4A9AC0',
        'editorRuler.foreground': '#252D35',
        'editorCodeLens.foreground': '#5A6A6C',
      }
    },
    'nostromo-light': {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '8A9A9C', fontStyle: 'italic' },
        { token: 'comment.doc', foreground: '8A9A9C', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'B54230' },
        { token: 'keyword.control', foreground: 'B54230' },
        { token: 'keyword.operator', foreground: '0D3D3F' },
        { token: 'operator', foreground: '0D3D3F' },
        { token: 'namespace', foreground: '1A8C5E' },
        { token: 'variable', foreground: '0D3D3F' },
        { token: 'variable.parameter', foreground: '3A6A8C' },
        { token: 'variable.readonly', foreground: '1A8C5E' },
        { token: 'type', foreground: '1A6A8C' },
        { token: 'class', foreground: '1A6A8C' },
        { token: 'interface', foreground: '1A6A8C' },
        { token: 'function', foreground: '1A8C5E' },
        { token: 'function.call', foreground: '1A8C5E' },
        { token: 'string', foreground: '2A829C' },
        { token: 'string.escape', foreground: 'A04080' },
        { token: 'number', foreground: '1A6A8C' },
        { token: 'constant', foreground: '1A8C5E' },
        { token: 'property', foreground: '3A6A8C' },
        { token: 'property.readonly', foreground: '1A8C5E' },
        { token: 'decorator', foreground: '9A8A20' },
        { token: 'tag', foreground: 'B54230' },
        { token: 'attribute.name', foreground: '1A8C5E' },
        { token: 'attribute.value', foreground: '2A829C' },
        { token: 'invalid', foreground: 'B54230' },
        { token: 'meta', foreground: '0D3D3F' },
        { token: 'regexp', foreground: '9A8A20' },
      ],
      colors: {
        'editor.background': '#F5F0E6',
        'editor.foreground': '#0D3D3F',
        'editorLineNumber.foreground': '#A8B5B6',
        'editorLineNumber.activeForeground': '#0D3D3F',
        'editorCursor.foreground': '#0D3D3F',
        'editor.lineHighlightBackground': '#EDE8DE',
        'editor.lineHighlightBorder': '#C4D4D5',
        'editor.selectionBackground': '#A5D8DB',
        'editor.selectionHighlightBackground': '#D4E8EA',
        'editor.findMatchBackground': '#81BFD4',
        'editor.findMatchHighlightBackground': '#81BFD480',
        'editorBracketMatch.background': '#C4D4D5',
        'editorBracketMatch.border': '#2A829C',
        'editorHoverWidget.background': '#F5F0E6',
        'editorHoverWidget.border': '#C4D4D5',
        'editorWidget.background': '#F5F0E6',
        'editorWidget.border': '#C4D4D5',
        'editorSuggestWidget.background': '#FAF6EE',
        'editorSuggestWidget.border': '#C4D4D5',
        'editorSuggestWidget.highlightForeground': '#1A8C5E',
        'editorSuggestWidget.selectedBackground': '#E0EBEC',
        'editorIndentGuide.background': '#DDD8CE',
        'editorIndentGuide.activeBackground': '#2A829C',
        'editorRuler.foreground': '#DDD8CE',
        'editorCodeLens.foreground': '#A8B5B6',
      }
    },
    'nostromo-light-modern': {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '8A9A9C', fontStyle: 'italic' },
        { token: 'comment.doc', foreground: '8A9A9C', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'B54230' },
        { token: 'keyword.control', foreground: 'B54230' },
        { token: 'keyword.operator', foreground: '0D3D3F' },
        { token: 'operator', foreground: '0D3D3F' },
        { token: 'namespace', foreground: '1A8C5E' },
        { token: 'variable', foreground: '0D3D3F' },
        { token: 'variable.parameter', foreground: '3A6A8C' },
        { token: 'variable.readonly', foreground: '1A8C5E' },
        { token: 'type', foreground: '1A6A8C' },
        { token: 'class', foreground: '1A6A8C' },
        { token: 'interface', foreground: '1A6A8C' },
        { token: 'function', foreground: '1A8C5E' },
        { token: 'function.call', foreground: '1A8C5E' },
        { token: 'string', foreground: '2A829C' },
        { token: 'string.escape', foreground: 'A04080' },
        { token: 'number', foreground: '1A6A8C' },
        { token: 'constant', foreground: '1A8C5E' },
        { token: 'property', foreground: '3A6A8C' },
        { token: 'property.readonly', foreground: '1A8C5E' },
        { token: 'decorator', foreground: '9A8A20' },
        { token: 'tag', foreground: 'B54230' },
        { token: 'attribute.name', foreground: '1A8C5E' },
        { token: 'attribute.value', foreground: '2A829C' },
        { token: 'invalid', foreground: 'B54230' },
        { token: 'meta', foreground: '0D3D3F' },
        { token: 'regexp', foreground: '9A8A20' },
      ],
      colors: {
        'editor.background': '#FAFBFC',
        'editor.foreground': '#0D3D3F',
        'editorLineNumber.foreground': '#A8B5B6',
        'editorLineNumber.activeForeground': '#0D3D3F',
        'editorCursor.foreground': '#0D3D3F',
        'editor.lineHighlightBackground': '#F0F4F5',
        'editor.lineHighlightBorder': '#E0E8EA',
        'editor.selectionBackground': '#A5D8DB',
        'editor.selectionHighlightBackground': '#D4E8EA',
        'editor.findMatchBackground': '#81BFD4',
        'editor.findMatchHighlightBackground': '#81BFD480',
        'editorBracketMatch.background': '#E0E8EA',
        'editorBracketMatch.border': '#2A829C',
        'editorHoverWidget.background': '#FAFBFC',
        'editorHoverWidget.border': '#E0E8EA',
        'editorWidget.background': '#FFFFFF',
        'editorWidget.border': '#E0E8EA',
        'editorSuggestWidget.background': '#FFFFFF',
        'editorSuggestWidget.border': '#E0E8EA',
        'editorSuggestWidget.highlightForeground': '#1A8C5E',
        'editorSuggestWidget.selectedBackground': '#E8F4F5',
        'editorIndentGuide.background': '#E0E8EA',
        'editorIndentGuide.activeBackground': '#2A829C',
        'editorRuler.foreground': '#E0E8EA',
        'editorCodeLens.foreground': '#8A9A9C',
      }
    }
  };

  // Initialize Monaco Editor
  async function initMonaco() {
    if (isMonacoLoaded) return;
    
    const container = document.getElementById('editor-container');
    if (!container) return;

    try {
      // Dynamic import of Monaco from CDN
      const monaco = await import('https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/esm/vs/editor/editor.main.js');
      
      // Configure workers
      self.MonacoEnvironment = {
        getWorkerUrl: function(moduleId, label) {
          const baseUrl = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/esm/vs';
          const workers = {
            'json': `${baseUrl}/language/json/json.worker.js`,
            'css': `${baseUrl}/language/css/css.worker.js`,
            'html': `${baseUrl}/language/html/html.worker.js`,
            'typescript': `${baseUrl}/language/typescript/ts.worker.js`,
            'javascript': `${baseUrl}/language/typescript/ts.worker.js`
          };
          return workers[label] || `${baseUrl}/editor/editor.worker.js`;
        }
      };

      // Define all themes
      Object.entries(themes).forEach(([name, themeData]) => {
        monaco.editor.defineTheme(name, themeData);
      });

      // Create editor instance
      editor = monaco.editor.create(container, {
        value: sampleCode,
        language: 'typescript',
        theme: 'nostromo-dark',
        automaticLayout: true,
        minimap: { 
          enabled: true,
          scale: 1,
          renderCharacters: false
        },
        fontSize: 14,
        fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
        fontLigatures: true,
        lineNumbers: 'on',
        roundedSelection: true,
        scrollBeyondLastLine: false,
        readOnly: true,
        wordWrap: 'on',
        wrappingIndent: 'indent',
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        renderWhitespace: 'selection',
        bracketPairColorization: { enabled: true },
        guides: {
          bracketPairs: true,
          indentation: true
        },
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto'
        }
      });

      isMonacoLoaded = true;
      
      // Initialize theme switcher
      initThemeSwitcher();
      
    } catch (error) {
      console.error('Failed to load Monaco Editor:', error);
      container.innerHTML = '<div style="padding: 40px; text-align: center; color: #6ba3a5;">' +
        '<p>⚠ Editor preview temporarily unavailable</p>' +
        '<p style="font-size: 0.85rem;">Install the extension to see the theme in action</p>' +
        '</div>';
    }
  }

  // Theme switcher functionality
  function initThemeSwitcher() {
    const buttons = document.querySelectorAll('.theme-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active state
        buttons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        
        // Switch theme
        const themeName = button.dataset.theme;
        if (editor && window.monaco) {
          window.monaco.editor.setTheme(themeName);
        }
      });
    });
  }

  // Palette tabs functionality
  function initPaletteTabs() {
    const tabs = document.querySelectorAll('.palette-tab');
    const grids = document.querySelectorAll('.palette-grid');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        tabs.forEach(t => { t.classList.remove('active'); });
        tab.classList.add('active');
        
        // Show corresponding grid
        const paletteId = tab.dataset.palette;
        grids.forEach(grid => { grid.classList.add('hidden'); });
        document.getElementById(`palette-${paletteId}`).classList.remove('hidden');
      });
    });
  }

  // Intersection Observer for lazy loading Monaco
  function setupLazyLoading() {
    const container = document.getElementById('editor-container');
    if (!container) return;
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isMonacoLoaded) {
            initMonaco();
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '100px'
      });
      
      observer.observe(container);
    } else {
      // Fallback: load immediately if IntersectionObserver not supported
      initMonaco();
    }
  }

  // Smooth scroll for navigation links
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Initialize everything when DOM is ready
  function init() {
    setupLazyLoading();
    initPaletteTabs();
    setupSmoothScroll();
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

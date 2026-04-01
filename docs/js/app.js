/**
 * Nostromo Theme - Monaco Editor App
 * Live theme preview with working theme toggles
 */

(function() {
  'use strict';

  // Sample TypeScript code for preview
  const sampleCode = `/**
 * NOSTROMO - Commercial Towing Vehicle
 * Registration: 180924609
 * 
 * A retro-futuristic theme inspired by 1970s sci-fi interfaces
 */

import { Spacecraft } from './types';

class Nostromo extends Spacecraft {
  private crew: CrewMember[];
  private cargo: MineralOre[];
  private status: ShipStatus;

  constructor(registry: string) {
    super(registry);
    this.crew = [];
    this.cargo = [];
    this.status = 'DOCKED';
  }

  // Lifecycle methods
  public async wakeCrew(): Promise<void> {
    console.log("Mother: Crew awakening initiated...");
    
    for (const member of this.crew) {
      await member.revive();
      this.log(\`Crew \${member.name} revived\`);
    }
    
    this.status = 'ACTIVE';
  }

  public async investigate(coords: Coordinates): Promise<Discovery> {
    const discovery = await this.scan(coords);
    
    if (discovery.type === 'XENOMORPH') {
      this.alert("DANGER: Unknown lifeform detected!");
      this.status = 'DISTRESS';
    }
    
    return discovery;
  }

  // Utility methods
  private log(message: string): void {
    const entry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      source: 'NOSTROMO'
    };
    this.systemLogs.push(entry);
  }

  public getStatusReport(): string {
    return \`Ship: Nostromo
Registry: \${this.registry}
Status: \${this.status}
Crew: \${this.crew.length} members
Cargo: \${this.cargo.length} tons\`;
  }
}

// Initialize
const nostromo = new Nostromo("180924609");
export default nostromo;`;

  // Theme definitions matching VSCode theme files
  const themeDefinitions = {
    'nostromo-dark': {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6B8A8C', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'E85A45' },
        { token: 'keyword.control', foreground: 'E85A45' },
        { token: 'keyword.operator', foreground: 'A5FBFF' },
        { token: 'operator', foreground: 'A5FBFF' },
        { token: 'namespace', foreground: '3DF2AD' },
        { token: 'variable', foreground: 'A5FBFF' },
        { token: 'variable.parameter', foreground: '92DDE1' },
        { token: 'variable.readonly', foreground: '3DF2AD' },
        { token: 'type', foreground: '4DDCFF' },
        { token: 'class', foreground: '4DDCFF' },
        { token: 'interface', foreground: '4DDCFF' },
        { token: 'function', foreground: '3DF2AD' },
        { token: 'function.call', foreground: '3DF2AD' },
        { token: 'string', foreground: '3F9BBC' },
        { token: 'string.escape', foreground: 'EB78C3' },
        { token: 'number', foreground: '4DDCFF' },
        { token: 'constant', foreground: '3DF2AD' },
        { token: 'property', foreground: '92DDE1' },
        { token: 'property.readonly', foreground: '3DF2AD' },
        { token: 'decorator', foreground: 'FFFF84' },
        { token: 'tag', foreground: 'E85A45' },
        { token: 'attribute.name', foreground: '3DF2AD' },
        { token: 'attribute.value', foreground: '3F9BBC' },
        { token: 'invalid', foreground: 'E85A45' },
        { token: 'meta', foreground: 'A5FBFF' },
        { token: 'regexp', foreground: 'FFFF84' },
      ],
      colors: {
        'editor.background': '#141D22',
        'editor.foreground': '#A5FBFF',
        'editorLineNumber.foreground': '#3A4C4E',
        'editorLineNumber.activeForeground': '#A5FBFF',
        'editorCursor.foreground': '#A5FBFF',
        'editor.lineHighlightBackground': '#1A252B',
        'editor.lineHighlightBorder': '#154547',
        'editor.selectionBackground': '#154547',
        'editor.selectionHighlightBackground': '#1E2F33',
        'editor.findMatchBackground': '#365878',
        'editor.findMatchHighlightBackground': '#36587880',
        'editorBracketMatch.background': '#154547',
        'editorBracketMatch.border': '#3F9BBC',
        'editorHoverWidget.background': '#141D22',
        'editorHoverWidget.border': '#154547',
        'editorWidget.background': '#141D22',
        'editorWidget.border': '#154547',
        'editorSuggestWidget.background': '#141D22',
        'editorSuggestWidget.border': '#154547',
        'editorSuggestWidget.highlightForeground': '#3DF2AD',
        'editorSuggestWidget.selectedBackground': '#154547',
        'editorIndentGuide.background': '#1A252B',
        'editorIndentGuide.activeBackground': '#3F9BBC',
        'editorRuler.foreground': '#1A252B',
        'editorCodeLens.foreground': '#3A4C4E',
      }
    },
    'nostromo-dark-modern': {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '5A8C8D', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'E85A45' },
        { token: 'keyword.control', foreground: 'E85A45' },
        { token: 'keyword.operator', foreground: 'A5FBFF' },
        { token: 'operator', foreground: 'A5FBFF' },
        { token: 'namespace', foreground: '4DFFA8' },
        { token: 'variable', foreground: '#D4EBF0' },
        { token: 'variable.parameter', foreground: '#9AEBF0' },
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
        { token: 'property', foreground: '#9AEBF0' },
        { token: 'property.readonly', foreground: '4DFFA8' },
        { token: 'decorator', foreground: 'D4C440' },
        { token: 'tag', foreground: 'E85A45' },
        { token: 'attribute.name', foreground: '4DFFA8' },
        { token: 'attribute.value', foreground: '5AC0FF' },
        { token: 'invalid', foreground: 'E85A45' },
        { token: 'meta', foreground: '#D4EBF0' },
        { token: 'regexp', foreground: 'D4C440' },
      ],
      colors: {
        'editor.background': '#1A2026',
        'editor.foreground': '#D4EBF0',
        'editorLineNumber.foreground': '#4A5A5C',
        'editorLineNumber.activeForeground': '#D4EBF0',
        'editorCursor.foreground': '#D4EBF0',
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
  function initMonaco() {
    // Configure Monaco AMD loader
    require.config({
      paths: {
        'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.55.0/min/vs'
      }
    });

    // Load Monaco Editor
    require(['vs/editor/editor.main'], function() {
      const container = document.getElementById('editor');
      if (!container) return;

      // Define all themes
      Object.entries(themeDefinitions).forEach(([name, themeData]) => {
        monaco.editor.defineTheme(name, themeData);
      });

      // Create editor instance
      const editor = monaco.editor.create(container, {
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

      // Initialize theme switcher
      initThemeSwitcher(editor);
    });
  }

  // Theme switcher functionality
  function initThemeSwitcher(editor) {
    const buttons = document.querySelectorAll('.theme-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active state
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Switch theme
        const themeName = button.dataset.theme;
        monaco.editor.setTheme(themeName);
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMonaco);
  } else {
    initMonaco();
  }
})();

import React, { useMemo, useRef, useState } from 'react';
import { RichTextEditor, type EditorAPI } from '@editora/react';
import {
  A11yCheckerPlugin,
  BackgroundColorPlugin,
  BoldPlugin,
  ChecklistPlugin,
  CodePlugin,
  CodeSamplePlugin,
  CommentsPlugin,
  DirectionPlugin,
  EmojisPlugin,
  HeadingPlugin,
  HistoryPlugin,
  ItalicPlugin,
  LinkPlugin,
  ListPlugin,
  MathPlugin,
  PreviewPlugin,
  PrintPlugin,
  TablePlugin,
  TextAlignmentPlugin,
  TextColorPlugin,
  UnderlinePlugin,
} from '@editora/plugins';
import { Button, Flex, Grid } from '@editora/ui-react';
import { toastAdvanced } from '@editora/toast';

const panel: React.CSSProperties = { border: '1px solid #e2e8f0', borderRadius: 16, padding: 20, background: '#fff', marginBottom: 20 };
const h2: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0f172a' };
const h3: React.CSSProperties = { fontSize: 15, fontWeight: 650, marginBottom: 12, color: '#334155' };
const note: React.CSSProperties = { fontSize: 13, color: '#64748b', marginTop: 10 };

const articleHtml = `
  <h2>Launch briefing</h2>
  <p>Editora gives product teams a rich authoring surface with toolbar actions, structured content, autosave hooks, and plugin-driven workflows.</p>
  <ul>
    <li>Draft product updates</li>
    <li>Review legal notes</li>
    <li>Publish formatted release notes</li>
  </ul>
`;

const readonlyHtml = `
  <h2>Published policy</h2>
  <p>This document is rendered in read-only mode so reviewers can inspect the same rich content without editing it.</p>
  <blockquote>Use read-only surfaces for approvals, previews, and embedded knowledge-base articles.</blockquote>
`;

const plugins = [
  HeadingPlugin(),
  BoldPlugin(),
  ItalicPlugin(),
  UnderlinePlugin(),
  ListPlugin(),
  ChecklistPlugin(),
  LinkPlugin(),
  HistoryPlugin(),
  TextAlignmentPlugin(),
  TextColorPlugin(),
  BackgroundColorPlugin(),
  CodePlugin(),
];

const enterprisePlugins = [
  ...plugins,
  TablePlugin(),
  CodeSamplePlugin(),
  MathPlugin(),
  EmojisPlugin(),
  CommentsPlugin(),
  A11yCheckerPlugin(),
  DirectionPlugin(),
  PreviewPlugin(),
  PrintPlugin(),
];

function editorShell(children: React.ReactNode) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      {children}
    </div>
  );
}

export function EditoraEditorDemo() {
  return (
    <div>
      <h2 style={h2}>Editora Rich Text Editor</h2>
      <div style={panel}>
        <h3 style={h3}>Default authoring surface</h3>
        {editorShell(
          <RichTextEditor
            defaultValue={articleHtml}
            placeholder="Start writing..."
            toolbar={{ items: ['heading', 'bold', 'italic', 'underline', 'link', 'bulletList', 'orderedList'] }}
            statusbar={{ enabled: true, position: 'bottom' }}
            content={{ minHeight: 220, autoHeight: true }}
          />,
        )}
        <div style={note}>A compact starter setup with toolbar, placeholder, status bar, and seeded content.</div>
      </div>
    </div>
  );
}

export function EditoraControlledDemo() {
  const [html, setHtml] = useState(articleHtml);

  return (
    <div>
      <h2 style={h2}>Controlled Editor</h2>
      <div style={panel}>
        <h3 style={h3}>State-backed content</h3>
        {editorShell(
          <RichTextEditor
            value={html}
            onChange={setHtml}
            toolbar={{ sticky: true, items: ['bold', 'italic', 'link', 'blockquote', 'clearFormatting'] }}
            statusbar={{ enabled: true }}
            content={{ minHeight: 200 }}
          />,
        )}
      </div>
      <div style={panel}>
        <h3 style={h3}>Live HTML output</h3>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 12, color: '#334155', background: '#f8fafc', borderRadius: 10, padding: 12, maxHeight: 180, overflow: 'auto' }}>
          {html}
        </pre>
      </div>
    </div>
  );
}

export function EditoraReadOnlyDemo() {
  return (
    <div>
      <h2 style={h2}>Read-only Editor</h2>
      <div style={panel}>
        <h3 style={h3}>Reviewer view</h3>
        {editorShell(
          <RichTextEditor
            defaultValue={readonlyHtml}
            readonly
            toolbar={{ items: [] }}
            statusbar={{ enabled: false }}
            content={{ minHeight: 180 }}
          />,
        )}
      </div>
    </div>
  );
}

export function EditoraPluginsDemo() {
  const activePlugins = useMemo(() => plugins, []);

  return (
    <div>
      <h2 style={h2}>Plugin Toolbar</h2>
      <div style={panel}>
        <h3 style={h3}>Formatting plugin set</h3>
        {editorShell(
          <RichTextEditor
            defaultValue="<h2>Plugin document</h2><p>Select text and use the toolbar for formatting, links, lists, colors, and code.</p>"
            plugins={activePlugins}
            toolbar={{ sticky: true, showMoreOptions: true }}
            floatingToolbar={{ enabled: true }}
            contextMenu={{ enabled: true }}
            history={{ maxSteps: 50, debounceMs: 300 }}
            content={{ minHeight: 240 }}
          />,
        )}
      </div>
    </div>
  );
}

export function EditoraEnterpriseDemo() {
  const activePlugins = useMemo(() => enterprisePlugins, []);

  return (
    <div>
      <h2 style={h2}>Enterprise Editor</h2>
      <Grid style={{ gap: 20 }}>
        <div style={panel}>
          <h3 style={h3}>Document workflow setup</h3>
          {editorShell(
            <RichTextEditor
              defaultValue="<h2>Quarterly business review</h2><p>Add tables, comments, code samples, equations, and review helpers from the enterprise-style plugin set.</p>"
              plugins={activePlugins}
              toolbar={{ sticky: true, showMoreOptions: true }}
              menubar={{ enabled: true, items: ['file', 'edit', 'insert', 'format', 'tools'] }}
              contextMenu={{ enabled: true }}
              paste={{ clean: true, keepFormatting: true, convertWord: true }}
              spellcheck={{ enabled: true, provider: 'browser' }}
              accessibility={{ enableARIA: true, keyboardNavigation: true, checker: true }}
              security={{ sanitizeOnInput: true, sanitizeOnPaste: true }}
              statusbar={{ enabled: true }}
              content={{ minHeight: 260, sanitize: true }}
            />,
          )}
        </div>
        <div style={panel}>
          <h3 style={h3}>RTL and autosave configuration</h3>
          {editorShell(
            <RichTextEditor
              defaultValue="<h2>Global content note</h2><p>Use language and autosave options for internationalized authoring flows.</p>"
              plugins={[BoldPlugin(), ItalicPlugin(), DirectionPlugin(), HistoryPlugin()]}
              toolbar={{ items: ['bold', 'italic', 'direction', 'undo', 'redo'] }}
              language={{ locale: 'ar', direction: 'rtl' }}
              autosave={{ enabled: true, intervalMs: 3000, storageKey: 'editora-sandbox-autosave', provider: 'localStorage' }}
              content={{ minHeight: 180 }}
            />,
          )}
        </div>
      </Grid>
    </div>
  );
}

export function EditoraApiDemo() {
  const editorRef = useRef<EditorAPI | null>(null);
  const [snapshot, setSnapshot] = useState('');

  const setPreset = () => {
    editorRef.current?.setHTML('<h2>API inserted content</h2><p>This content was pushed through the EditorAPI.</p>');
    setSnapshot(editorRef.current?.getHTML() || '');
  };

  return (
    <div>
      <h2 style={h2}>Editor API</h2>
      <div style={panel}>
        <h3 style={h3}>Imperative controls</h3>
        <Flex style={{ gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <Button size="sm" onClick={() => editorRef.current?.focus()}>Focus</Button>
          <Button size="sm" variant="secondary" onClick={setPreset}>Insert preset</Button>
          <Button size="sm" variant="secondary" onClick={() => setSnapshot(editorRef.current?.getHTML() || '')}>Read HTML</Button>
          <Button size="sm" variant="ghost" onClick={() => toastAdvanced.info('State captured', { duration: 1200, theme: 'light' })}>Toast</Button>
        </Flex>
        {editorShell(
          <RichTextEditor
            defaultValue="<p>Use the buttons above to focus, insert, and inspect editor content.</p>"
            onInit={(editor) => {
              editorRef.current = editor;
              setSnapshot(editor.getHTML());
            }}
            onChange={setSnapshot}
            toolbar={{ items: ['bold', 'italic', 'link'] }}
            content={{ minHeight: 180 }}
          />,
        )}
      </div>
      <div style={panel}>
        <h3 style={h3}>Latest HTML snapshot</h3>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 12, color: '#334155', background: '#f8fafc', borderRadius: 10, padding: 12 }}>
          {snapshot || 'No content captured yet.'}
        </pre>
      </div>
    </div>
  );
}

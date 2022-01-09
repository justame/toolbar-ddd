import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import { Editor, EditorContent, JSONContent } from '@tiptap/react';

const getSelectedNodes = (editor) => {
  const selection = editor.state.selection;
  const nodes: Node[] = [];
  editor.state.doc.nodesBetween(selection.from, selection.to, (node: Node) => {
    nodes.push(node);
  });

  return nodes;
};

export function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

export const Tiptap = ({ onSelectionChange, onLoad }) => {
  const forceUpdate = useForceUpdate();
  const [editor, setEditor] = useState<Editor>(null as unknown as Editor);

  useEffect(() => {
    const editorInstance = new Editor({
      extensions: [StarterKit],
      content: '<p>Hello World!</p>',
      injectCSS: true,
      onSelectionUpdate: ({ editor }) => {
        if (editor) {
          const nodes = getSelectedNodes(editor);
          onSelectionChange(nodes);
        }
      },
    });

    editorInstance.on('transaction', forceUpdate);
    setEditor(editorInstance);
    onLoad(editorInstance);
  }, []);

  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
};

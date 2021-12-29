import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';

const getSelectedNodes = (editor) => {
  const selection = editor.state.selection;
  const nodes: Node[] = [];
  editor.state.doc.nodesBetween(selection.from, selection.to, (node: Node) => {
    nodes.push(node);
  });

  return nodes;
};

export const Tiptap = ({ onSelectionChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
    onSelectionUpdate: ({ editor }) => {
      const nodes = getSelectedNodes(editor);
      onSelectionChange(nodes);
    },
  });

  return <EditorContent editor={editor} on />;
};

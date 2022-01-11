import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
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
      extensions: [StarterKit, Image, TextStyle, Color],
      content: `<p>Hello World! </p>
      <p>
      <span style="color: #958DF1"> text with color </span>
      </p>
          <img src="https://source.unsplash.com/K9QHL52rE2k/800x400" />
          <p>fjsdkjfdklsjfldksjl</p>
        `,
      injectCSS: true,
      onUpdate: ({ editor }) => {
        if (editor) {
          const nodes = getSelectedNodes(editor);
          onSelectionChange(nodes);
        }
      },
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

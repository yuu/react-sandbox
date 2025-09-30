import { $getRoot, $getSelection } from "lexical";
import { useEffect } from "react";
import type { ComponentProps } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { MentionsPlugin } from "./plugins/MentionsPlugin";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { theme1 } from "./theme";
import { Nodes } from "./nodes";

const Editor = () => {
    const initialConfig: ComponentProps<
        typeof LexicalComposer
    >["initialConfig"] = {
        namespace: "MyEditor",
        onError: (error: Error) =>
            console.error("MyEditor", error.message + "\n" + error.stack),
        theme: theme1,
        nodes: [...Nodes],
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="editor-container">
                <ToolbarPlugin />
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                className="editor-input"
                                aria-placeholder={"Enter some text..."}
                                placeholder={
                                    <div className="editor-placeholder">
                                        プレースホルダー...
                                    </div>
                                }
                            />
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <MentionsPlugin />
                </div>
            </div>
        </LexicalComposer>
    );
};

export const LexcialEditor = () => {
    return (
        <div>
            <h1>Lexical Editor</h1>
            <Editor />
        </div>
    );
};

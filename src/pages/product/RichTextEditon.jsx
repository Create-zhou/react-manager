import React, { Component } from 'react';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditon extends Component {
  constructor(props) {
    super(props);
    const details = this.props.details;
    if (details) {  
      const contentBlock = htmlToDraft(details); 
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }else{
     this.state = {
        editorState: EditorState.createEmpty(),
    }
  }
  }

  getDetails=()=>draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  


  onEditorStateChange= (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorStyle={{border:'1px solid black',paddingLeft:'10px',height:'200px'}}
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

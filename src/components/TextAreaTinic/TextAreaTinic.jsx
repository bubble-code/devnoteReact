
import React, { useRef } from 'react';
import ProtTypes from 'prop-types';

// Components
import { Editor } from '@tinymce/tinymce-react';
import SoftBox from 'components/SoftBox';

export default function TextAreaTinic({ value }) {
    // const editorRef = useRef(null);
    // const log = () => {
    //     if (editorRef.current) {
    //         console.log(editorRef.current.getContent());
    //     }
    // };
    // const handleEditorChange = (content) => {
    //     onChange(id, content);
    // };
    return (
        <SoftBox>
            <Editor
                // onInit={(evt, editor) => editorRef.current = editor}
                value={value}
                init={{
                    // height: auto,
                    menubar: false,
                    // plugins: [
                    //     'advlist autolink lists link image charmap print preview anchor',
                    //     'searchreplace visualblocks code fullscreen',
                    //     'insertdatetime media table paste code help wordcount'
                    // ],
                    // toolbar: 'undo redo | formatselect | ' +
                    //     'bold italic backcolor | alignleft aligncenter ' +
                    //     'alignright alignjustify | bullist numlist outdent indent | ' +
                    //     'removeformat | help',
                    // toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:1rem;line-height: 1.8rem; }'
                }}
            // value={'snkadnsdnla'}
            // onEditorChange={handleEditorChange}
            />
            {/*<button onClick={log}>Log editor content</button>*/}
        </SoftBox>
    );
}


TextAreaTinic.propTypes = {
    value: ProtTypes.string
};

import React, { useRef } from 'react';
import ProtTypes from 'prop-types';

// Components
import { Editor } from '@tinymce/tinymce-react';
import SoftBox from 'components/SoftBox';

export default function WriteAreaContainer({ id, value, onChange }) {
    // const editorRef = useRef(null);
    // const log = () => {
    //     if (editorRef.current) {
    //         console.log(editorRef.current.getContent());
    //     }
    // };
    const handleEditorChange = (content) => {
        onChange(id, content);
    };
    return (
        <SoftBox>
            <Editor
                // onInit={(evt, editor) => editorRef.current = editor}
                value={value}
                apiKey="jgtl5czj43aj8fysglacem8dii96jgui2meic2tj27f0cfb4"
                textareaName='writeArea'
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    // toolbar: 'undo redo | formatselect | ' +
                    //     'bold italic backcolor | alignleft aligncenter ' +
                    //     'alignright alignjustify | bullist numlist outdent indent | ' +
                    //     'removeformat | help',
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                    content_style: 'body { font-family: az_ea_font, az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif; font-size:18px; line-height: 2.2rem; }'
                }}
                // value={'snkadnsdnla'}
                onEditorChange={handleEditorChange}
            />
            {/*<button onClick={log}>Log editor content</button>*/}
        </SoftBox>
    );
}


WriteAreaContainer.propTypes = {
    id: ProtTypes.string,
    value: ProtTypes.string.isRequired,
    onChange: ProtTypes.func.isRequired,
};
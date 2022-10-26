import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ClientAction } from '../../../redux/actions/actions';

// Components
import { Input, Select, Form, Radio, Button, Space, Spin } from 'antd';
import { Fragment } from 'react';
import { Savings } from '@mui/icons-material';


const defaultValues = {
    name: "",
    lastName: "",
    cnumb: "",
    dob: "",
    dxCode: "",
    dataAssigned: "",
    gender: '',
    cm: '',
};
const { Option } = Select;

export default function TabAddClient() {
    const { listCMs = [] } = useSelector(state => state.listCM);
    const dispatchRedux = useDispatch();
    const [form] = Form.useForm();

    const handleSubmit = (value) => {
        dispatchRedux(ClientAction({ value: value }));
        form.resetFields();
    };
    const rule = [{ required: true, message: 'This field is required' }];
    return (
        <Form layout='vertical' form={form} initialValues={defaultValues} name='newClient' onFinish={handleSubmit} labelAlign='left' labelCol={{ span: 24 }} >
            <Form.Item name={'cm'} shouldUpdate initialValue={''} rules={rule}>
                <Select id='ccmmSelect' allowClear>
                    {listCMs.map((cm) => (
                        <Option key={cm.label} value={cm.label}>{cm.label}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name={'name'} rules={rule}>
                <Input placeholder='Client Name' />
            </Form.Item>
            <Form.Item name={'lastName'} rules={rule}>
                <Input placeholder="Client's Last Name" />
            </Form.Item>
            <Form.Item name={'cnumb'} rules={rule}>
                <Input placeholder="Client's Number" />
            </Form.Item>
            <Form.Item name={'dob'} rules={rule} >
                <Input placeholder="Data Assigned" type='date' />
            </Form.Item>
            <Form.Item name={'dataAssigned'} >
                <Input placeholder="Data Assigned" type='date' />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
                <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value='female'>Female</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item >
                <Button autoFocus htmlType='submit'  >
                    Save
                </Button>
            </Form.Item>
        </Form>

    );
}


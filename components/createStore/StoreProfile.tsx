"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Upload, Row, Col, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';
import styled from 'styled-components';
import axios from 'axios';

const { Option } = Select;

const Container = styled.div`
  padding: 20px;
`;

const UploadContainer = styled.div`
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 1px dashed #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 1.5cm;
`;

const UploadContent = styled.div`
  text-align: center;
  font-size: 14px;
  color: #999;
`;

const StoreProfile: React.FC = () => {
  const [storeImage, setStoreImage] = useState<string | null>(null);
  const [customerImage, setCustomerImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File, setImage: (image: string | null) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImage(response.data.filePath);
    } catch (error) {
      message.error('File upload failed');
    }
  };

  return (
    <Container>
      <Row gutter={24}>
        <Col span={12}>
          <Row>
            <Col span={8}>
              <UploadContainer>
                <Upload
                  accept="image/*"
                  beforeUpload={(file) => {
                    if (!file.type.startsWith('image/')) {
                      message.error(`${file.name} is not an image file`);
                      return Upload.LIST_IGNORE;
                    }
                    handleImageUpload(file, setStoreImage);
                    return false;
                  }}
                  showUploadList={false}
                >
                  <UploadContent>
                    {storeImage ? (
                      <Image src={storeImage} alt="Store" width={150} height={150} />
                    ) : (
                      <>
                        <PlusOutlined style={{ fontSize: '24px' }} />
                        <div>Upload</div>
                      </>
                    )}
                  </UploadContent>
                </Upload>
              </UploadContainer>
            </Col>
            <Col span={16}>
              <Form layout="vertical">
                <Form.Item label="Store's Name">
                  <Input placeholder="Store name" />
                </Form.Item>
                <Form.Item label="Store's Phone Number">
                  <Input placeholder="Store phone number" />
                </Form.Item>
                <Form.Item label="Store's Address">
                  <Input placeholder="Store address" />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item>
                      <Select placeholder="Thành phố">
                        <Option value="1">Thành Phố</Option>
                        <Option value="2">HCM City</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <Select placeholder="Quận / Huyện">
                        <Option value="1">Quận / Huyện</Option>
                        <Option value="2">Huyện</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <Select placeholder="Phường / Xã">
                        <Option value="1">Phường</Option>
                        <Option value="2">Xã</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={8}>
              <UploadContainer>
                <Upload
                  accept="image/*"
                  beforeUpload={(file) => {
                    if (!file.type.startsWith('image/')) {
                      message.error(`${file.name} is not an image file`);
                      return Upload.LIST_IGNORE;
                    }
                    handleImageUpload(file, setCustomerImage);
                    return false;
                  }}
                  showUploadList={false}
                >
                  <UploadContent>
                    {customerImage ? (
                      <Image src={customerImage} alt="Customer" width={150} height={150} />
                    ) : (
                      <>
                        <PlusOutlined style={{ fontSize: '24px' }} />
                        <div>Upload</div>
                      </>
                    )}
                  </UploadContent>
                </Upload>
              </UploadContainer>
            </Col>
            <Col span={16}>
              <Form layout="vertical">
                <Form.Item label="Customer's Name">
                  <Input placeholder="Customer name" />
                </Form.Item>
                <Form.Item label="Customer's Phone Number">
                  <Input placeholder="Customer phone number" />
                </Form.Item>
                <Form.Item label="Customer's Zalo">
                  <Input placeholder="Zalo ID" />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default StoreProfile;

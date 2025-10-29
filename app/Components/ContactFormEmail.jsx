import React from 'react';
import { Html, Body, Container, Heading, Text, Section, Hr } from '@react-email/components';

export default function ContactFormEmail({ name, email, subject, message }) {
  return (
    <Html>
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container>
          <Heading>New Contact Form Submission</Heading>
          <Text>You received a new message from your website's contact form.</Text>
          <Hr />
          <Section>
            <Text><strong>From:</strong> {name}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>Subject:</strong> {subject}</Text>
            <Text><strong>Message:</strong></Text>
            <Text>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Img,
  Hr,
} from '@react-email/components';

interface EmailProps {
  firstName: string;
  userEmail: string;
  courseTitle: string;
  coursePrice: number;
  courseImage: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export function Email({
  firstName,
  userEmail,
  courseTitle,
  coursePrice,
  courseImage,
}: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for purchasing {courseTitle}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={`https://res.cloudinary.com/dr2dnmx76/image/upload/v1761406970/EduProLogoDesign_pg337l.png`} width="150" alt="Logo" />

          <Heading style={h1}>Welcome, {firstName}! 👋</Heading>
          
          <Text style={text}>
            Thank you for purchasing "{courseTitle}". We're excited to have you
            on board!
          </Text>
          <Text style={text}>
            You can access all your courses directly from your dashboard.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={`${baseUrl}/dashboard`}>
              Go to Dashboard
            </Button>
          </Section>

          <Hr style={hr} />

          <Heading style={h2}>Order Summary</Heading>
          
          <Section>
            <Img src={courseImage} width="100%" style={image} alt={courseTitle} />
            <Heading style={h3}>{courseTitle}</Heading>
            
            <Text style={text}>
              <strong>Price:</strong> ${coursePrice}
            </Text>
            <Text style={text}>
              <strong>Purchase Date:</strong> {new Date().toLocaleDateString('en-US')}
            </Text>
            <Text style={text}>
              <strong>Billed to:</strong> {userEmail}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            The [Your Platform Name Here] Team
            <br />
            [Your Address or Contact Info Here]
          </Text>

        </Container>
      </Body>
    </Html>
  );
}

export default Email;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 40px',
  borderRadius: '8px',
  border: '1px solid #e6e6e6',
  marginTop: '40px',
  marginBottom: '40px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '32px',
  fontWeight: '700',
  margin: '30px 0 15px',
};

const h2 = {
  color: '#1d1c1d',
  fontSize: '24px',
  fontWeight: '600',
  margin: '20px 0 10px',
};

const h3 = {
  color: '#1d1c1d',
  fontSize: '18px',
  fontWeight: '600',
  margin: '15px 0 10px',
};

const text = {
  color: '#3c4043',
  fontSize: '16px',
  lineHeight: '26px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '20px',
  marginBottom: '20px',
};

const button = {
  backgroundColor: '#007bff',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '12px 24px',
};

const image = {
  borderRadius: '8px',
  margin: '10px 0',
};

const hr = {
  borderColor: '#e6e6e6',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
const fs = require('fs');
const files = ['en', 'zh', 'ja', 'es', 'ar', 'fr'];

const legalEN = {
  back: '← Back to Home',
  privacy: {
    title: 'Privacy Policy',
    description: 'How UniversePulse collects and uses your data.',
    updated: 'Last updated: September 4, 2026',
    contact: 'If you have questions about this Privacy Policy, please contact us at',
    sections: [
      { heading: '1. Information We Collect', content: 'UniversePulse does not collect, store, or sell any personal data. We do not use cookies for tracking, nor do we maintain user accounts. The only data we process is the birth date you voluntarily enter into the birthday calculator, which is processed entirely in your browser and never transmitted to our servers.' },
      { heading: '2. How We Use Information', content: 'Since we do not collect personal data, we do not use or process any information about you. The birth date you enter is used locally in your browser to calculate personal statistics. This data is not sent to any third party.' },
      { heading: '3. Google Analytics', content: 'We use Google Analytics (gtag.js) to understand how visitors interact with our site. Google Analytics collects standard internet log information and visitor behavior information in an anonymous, aggregated form. It does not identify individual users. Google\'s privacy policy applies to the data collected by its analytics services.' },
      { heading: '4. Data Security', content: 'Since we do not collect personal data, there is no personal data to secure. All calculations happen client-side in your browser. We use HTTPS to protect the connection between your browser and our servers.' },
      { heading: '5. Third-Party Services', content: 'We use Google Analytics for site analytics. By using our site, you consent to the collection and use of information by Google Analytics as described in their privacy policy: https://policies.google.com/privacy' },
      { heading: '6. Children\'s Privacy', content: 'UniversePulse is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us.' },
      { heading: '7. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.' },
      { heading: '8. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at support@universepulse.net.' }
    ]
  },
  terms: {
    title: 'Terms of Service',
    description: 'Terms and conditions for using UniversePulse.',
    updated: 'Last updated: September 4, 2026',
    contact: 'If you have questions about these Terms, please contact us at',
    sections: [
      { heading: '1. Acceptance of Terms', content: 'By accessing and using UniversePulse, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.' },
      { heading: '2. Description of Service', content: 'UniversePulse provides real-time global data estimates based on annual averages from authoritative sources such as UN DESA, IEA, BP, and FAO. All displayed values are mathematical approximations for educational and informational purposes only, and do not represent precise, real-time measurements.' },
      { heading: '3. Data Accuracy Disclaimer', content: 'The data presented on UniversePulse is derived from annual average rates converted to per-second estimates. While we use authoritative sources, all values are approximations. UniversePulse makes no warranties regarding the accuracy, completeness, or timeliness of the data. Users should not rely on the data for any specific purpose without verifying against primary sources.' },
      { heading: '4. Intellectual Property', content: 'All content on UniversePulse, including text, graphics, logos, and design elements, is the property of UniversePulse or its licensors and is protected by copyright and other intellectual property laws.' },
      { heading: '5. User Conduct', content: 'You agree to use UniversePulse only for lawful purposes. You may share links to our content on social media and other platforms. You may not resell, republish, or use our content for commercial purposes without explicit permission.' },
      { heading: '6. Limitation of Liability', content: 'UniversePulse shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the service. The data provided is for educational purposes only and should not be used for scientific, financial, or other professional decisions.' },
      { heading: '7. Changes to Terms', content: 'We reserve the right to modify these Terms at any time. Continued use of the service after changes constitutes acceptance of the new Terms.' },
      { heading: '8. Governing Law', content: 'These Terms shall be governed by and construed in accordance with applicable law, without regard to conflict of law principles.' }
    ]
  },
  about: {
    title: 'About UniversePulse',
    description: 'Our mission to make global data personal and accessible.',
    intro: 'UniversePulse is a real-time global data dashboard that transforms abstract macro-level statistics into deeply personal, emotionally resonant experiences. We believe that understanding global population, resource consumption, and environmental change should be accessible, beautiful, and meaningful to every individual.',
    mission: 'Our mission is to help every person on Earth understand their place in the global system — not as a passive observer, but as an active participant in the ongoing story of humanity and our planet. When you enter your birth date, you discover that the numbers behind global change are also your numbers.',
    data: 'All data on UniversePulse comes from authoritative annual sources including the United Nations Department of Economic and Social Affairs (UN DESA), the International Energy Agency (IEA), BP Statistical Review, FAO, and the Global Carbon Project. Annual totals are converted to per-second average rates using mathematical models. These are estimates for educational display, not precise measurements.',
    team: 'UniversePulse is an independent project built with Next.js, TypeScript, and Tailwind CSS. We are a small team passionate about data visualization, climate awareness, and making complex global statistics accessible to everyone.',
    contact: 'We would love to hear from you. Reach us at'
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with the UniversePulse team.',
    intro: 'Have a question, suggestion, or feedback? We\'d love to hear from you. The best way to reach us is by email.',
    methods: 'We currently respond to all emails within 48 hours on business days. For urgent matters, please mention "URGENT" in your subject line.',
    email: 'Email',
    response: 'Response Time',
    responseTime: 'We aim to respond to all inquiries within 48 hours during business days (Monday–Friday, excluding holidays).'
  }
};

const legalPlaceholder = {
  back: '← Back to Home',
  privacy: {
    title: 'Privacy Policy',
    description: 'How UniversePulse collects and uses your data.',
    updated: 'Last updated: September 4, 2026',
    contact: 'If you have questions, please contact us at',
    sections: [
      { heading: 'Privacy Policy', content: 'UniversePulse does not collect, store, or sell any personal data. All calculations happen client-side in your browser.' },
      { heading: 'Google Analytics', content: 'We use Google Analytics to understand visitor interactions. Google\'s privacy policy applies: https://policies.google.com/privacy' },
      { heading: 'Data Security', content: 'Since we do not collect personal data, there is no personal data to secure. All calculations happen client-side.' },
      { heading: 'Contact', content: 'If you have questions about this Privacy Policy, contact us at support@universepulse.net.' }
    ]
  },
  terms: {
    title: 'Terms of Service',
    description: 'Terms for using UniversePulse.',
    updated: 'Last updated: September 4, 2026',
    contact: 'If you have questions, please contact us at',
    sections: [
      { heading: 'Service Disclaimer', content: 'UniversePulse provides real-time data estimates for educational purposes. All values are mathematical approximations and should not be used for scientific or professional decisions.' },
      { heading: 'Data Accuracy', content: 'Data is derived from annual averages converted to per-second rates. We make no warranties regarding accuracy, completeness, or timeliness.' },
      { heading: 'Limitation of Liability', content: 'UniversePulse is not liable for any damages arising from your use of the service. Data is for educational purposes only.' },
      { heading: 'Contact', content: 'If you have questions about these Terms, contact us at support@universepulse.net.' }
    ]
  },
  about: {
    title: 'About UniversePulse',
    description: 'About our project.',
    intro: 'UniversePulse is a real-time global data dashboard. We make complex global statistics accessible, beautiful, and personally meaningful.',
    mission: 'Our mission is to help every person understand their place in the global system — as an active participant, not a passive observer.',
    data: 'All data comes from authoritative sources including UN DESA, IEA, BP, FAO, and the Global Carbon Project. Values are estimates for educational display.',
    team: 'UniversePulse is an independent project built with Next.js, TypeScript, and Tailwind CSS.',
    contact: 'We would love to hear from you. Reach us at'
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch.',
    intro: 'Have a question or feedback? Email us at support@universepulse.net.',
    methods: 'We respond to all emails within 48 hours on business days.',
    email: 'Email',
    response: 'Response Time',
    responseTime: 'We aim to respond within 48 hours during business days.'
  }
};

files.forEach(locale => {
  const path = 'd:/VScode/UniversePulse/messages/' + locale + '.json';
  let data = JSON.parse(fs.readFileSync(path, 'utf8'));
  if (locale === 'en') {
    data.legal = legalEN;
  } else {
    data.legal = legalPlaceholder;
  }
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Updated ' + locale + '.json - legal key added');
});

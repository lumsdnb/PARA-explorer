import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.lums.para',
  appName: 'PARA-org',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

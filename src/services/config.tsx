interface Config {
    url: {
      API_URL: string;
    }
  }

  const prod: Config = {
    url: {
      API_URL: 'https://meeting-cost.onrender.com'
    }
  };
  
  const dev: Config = {
    url: {
      API_URL: 'https://localhost:7216'
    }
  };
  
  export const config: Config = process.env.NODE_ENV === 'development' ? dev : prod;
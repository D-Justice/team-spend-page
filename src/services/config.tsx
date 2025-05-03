interface Config {
  url: {
    API_URL: string;
  },
  sso: {
    SSO_SCOPES: { scopes: string[] };
    AUTH: {
      auth: {
        clientId: string,
        authority: string,
        redirectUri: string
      },
      cache: {
        cacheLocation: string,
        storeAuthStateInCookie: boolean
      },
    }
  }
  scopes: {
    TEAM_SPEND: string,
    USER: string
  }
}

const prod: Config = {
  url: {
    API_URL: 'https://meeting-cost.onrender.com'
  },
  sso: {
    SSO_SCOPES: {
      scopes: ["User.Read", "TeamSpend.Read"]
    },
    AUTH: {
      auth: {
        clientId: "d52837c5-a6a0-46b6-aaa1-8b820af2576a",
        authority: "https://login.microsoftonline.com/common/v2.0",
        redirectUri: "https://www.team-spend.com/dashboard"
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
      }
    },
  },
  scopes: {
    TEAM_SPEND: "https://teamscallrecorder.onmicrosoft.com/093e700b-9436-4ad0-9986-09e17c5d3174/TeamSpend.Read.Write",
    USER: "User.Read"
  }
};

const dev: Config = {
  url: {
    API_URL: 'https://localhost:7216'
  },
  sso: {
    SSO_SCOPES: {
      scopes: ["User.Read"]
    },
    AUTH: {
      auth: {
        clientId: "f8c1f81c-89fc-4f04-96da-bce7926a0ba8",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000/dashboard"
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
      }
    }
  },
  scopes: {
    TEAM_SPEND: "api://f8c1f81c-89fc-4f04-96da-bce7926a0ba8/TeamSpend.Read.Write",
    USER: "User.Read"
  }
};

export const config: Config = process.env.NODE_ENV === 'development' ? dev : prod;
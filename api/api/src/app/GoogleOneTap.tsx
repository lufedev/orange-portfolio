import React from 'react';

const GoogleOneTap: React.FC = () => {
  return (
    <div id="g_id_onload"
         data-client_id="YOUR_GOOGLE_CLIENT_ID"
         data-login_uri="https://your.domain/your_login_endpoint"
         data-your_own_param_1_to_login="any_value"
         data-your_own_param_2_to_login="any_value">
    </div>
  );
};

export default GoogleOneTap;

import React from 'react';

const IconTask = ({ iconComponent, color }) => React.cloneElement(iconComponent, { size: 22, color });

export default IconTask;

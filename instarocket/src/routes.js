import { createAppContainer, createStackNavigator } from 'react-navigation';

import Feed from './pages/Feed';
import New from './pages/New';

// that's how we define our routes with react native
export default createAppContainer(
    createStackNavigator({
        Feed,
        New
    })
);

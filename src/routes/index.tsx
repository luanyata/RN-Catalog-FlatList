import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EventDetails } from '../pages/EventDetails'
import { EventList } from '../pages/EventList'

const { Navigator, Screen } = createNativeStackNavigator()


export const Routes = () => {
  return (
    <Navigator screenOptions={{
      headerShown: false,

    }}>
      <Screen name='Home' component={EventList} />
      <Screen name='EventDetails' component={EventDetails} />
    </Navigator>
  )
}
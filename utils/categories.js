import { Octicons, FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

export const CATEGORIES = [
  {
    icon: <Octicons name='tasklist' size={30} color='#ff0000' />,
    name: 'task',
    color: '#ff0000'
  },
  {
    icon: <FontAwesome name='plane' size={30} color='#2ca8b7' />,
    name: 'trip',
    color: '#2ca8b7'
  },
  {
    icon: <FontAwesome name='book' size={30} color='#d44dc4' />,
    name: 'study',
    color: '#d44dc4'
  },
  {
    icon: <MaterialCommunityIcons name='bike-fast' size={30} color='#f25321' />,
    name: 'sports',
    color: '#f25321'
  },
  {
    icon: <Octicons name='people' size={30} color='#0e19ea' />,
    name: 'social',
    color: '#0e19ea'
  },
  {
    icon: <Entypo name='home' size={30} color='#c78cee' />,
    name: 'home',
    color: '#c78cee'
  },
  {
    icon: <FontAwesome name='dollar' size={30} color='#6b8e23' />,
    name: 'finances',
    color: '#6b8e23'
  },
  {
    icon: <FontAwesome name='briefcase' size={30} color='#e18634' />,
    name: 'work',
    color: '#e18634'
  },
  {
    icon: <FontAwesome name='heartbeat' size={30} color='#fc3449' />,
    name: 'health',
    color: '#fc3449'
  },
  {
    icon: <MaterialCommunityIcons name='hexagon-multiple' size={30} color='#fec38a' />,
    name: 'other',
    color: '#fec38a'
  }
];

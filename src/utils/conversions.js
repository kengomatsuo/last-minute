import { Timestamp } from 'firebase/firestore'

// firebase firestamp to string
export const firestampToString = firestamp => {
  console.log('Converting:', firestamp)
  if (!firestamp || !firestamp.seconds) return ''
  console.log('Converted:', new Date(firestamp.seconds * 1000).toLocaleString())
  return new Date(firestamp.seconds * 1000).toLocaleString()
}
// string to firebase firestamp
export const stringToFirestamp = string => {
    const date = new Date(string)
    console.log('Converting:', date)
    console.log('Converted:', Timestamp.fromDate(date))
  return Timestamp.fromDate(date)
}

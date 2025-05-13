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

export const firestampToDateDiff = input => {
  const date = (input instanceof Timestamp)
    ? input.toDate()
    : (input instanceof Date)
      ? input
      : new Date(input)

  const now = new Date()
  const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dateMid  = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const msPerDay = 24 * 60 * 60 * 1000
  const diffDays = Math.round((todayMid - dateMid) / msPerDay)

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays === 2) return 'Two days ago'
  if (diffDays < 7) return `${diffDays} days ago`

  // handle weeks
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    if (weeks === 1) return 'One week ago'
    if (weeks === 2) return 'Two weeks ago'
    return `${weeks} weeks ago`
  }

  // handle months
  const yearDiff = now.getFullYear() - date.getFullYear()
  const monthDiff = now.getMonth() - date.getMonth() + yearDiff * 12

  if (monthDiff < 12) {
    if (monthDiff === 1) return 'One month ago'
    if (monthDiff === 2) return 'Two months ago'
    return `${monthDiff} months ago`
  }

  // handle years
  const years = Math.floor(monthDiff / 12)
  if (years === 1) return 'One year ago'
  if (years === 2) return 'Two years ago'
  return `${years} years ago`
}

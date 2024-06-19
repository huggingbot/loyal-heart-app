export const formatDateToReadable = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-SG', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour time
  })
  return formatter.format(date).replace(',', '') // Remove comma for Singapore format
}

export const parseReadableToDate = (readableDate: string) => {
  const [datePart, timePart] = readableDate.split(' ')
  const [day, month, year] = datePart.split('/').map(Number)
  const [hour, minute] = timePart.split(':').map(Number)

  const date = new Date(year, month - 1, day, hour, minute)
  return date
}

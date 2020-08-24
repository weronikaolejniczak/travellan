/**
 * get value and mode
 *
 * if type === text, scheme === http/https, includes 'booking.com/hotel'
 *
 *  fetch HTML for value
 *  parse HTML with cheerio
 *  if success
 *      return accommodation model
 *  else
 *      return error
 *
 *  OR
 *
 *  fetch from server
 *
 * else if type === media, scheme === file, includes '.pdf'
 *  parse with pdf.js
 *  if success
 *      return accommodation model
 *  else
 *      return error
 *
 * else return error
 */

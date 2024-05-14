import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import createHotel from '../models/Hotel';
import fetchCoordinates from './fetchCoordinates';

const isCreditCardPaymentPossible = (html: string): boolean => {
  const $ = cheerio.load(html);
  const creditCards = $('img.payment_methods_overall')
    .map((_, el) => $(el).attr('alt'))
    .get();
  return creditCards.length > 0;
};

const parseImages = (html: string): string | undefined => {
  const $ = cheerio.load(html);
  const imageRegex = /\/images\/hotel\//i;
  return $('img')
    .map((_, el) => $(el).attr('src'))
    .get()
    .find((src) => imageRegex.test(src));
};

const parseBreakfast = (html: string): string[] | undefined => {
  const $ = cheerio.load(html);
  const breakfast = $('span.ph-item-copy-breakfast-option')
    .text()
    .split(', ')
    .filter(Boolean);
  return breakfast.length ? breakfast : undefined;
};

const scrapeBooking = async (url: string) => {
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);
  const address = $(
    '#showMap2 > span.hp_address_subtitle.js-hp_address_subtitle.jq_tooltip',
  )
    .text()
    .replace(/\nul. | \n/g, '')
    .trim();
  const amenities = $(
    '#hotel_main_content .hp_hotel_description_hightlights_wrapper .hotel_description_wrapper_exp .hp_desc_important_facilities.clearfix .hp_desc_important_facilities--bui div',
  )
    .text()
    .split('\n')
    .filter((item) => item)
    .map((item) => item.toLowerCase().trim());
  const breakfast = parseBreakfast(html);
  const checkInHours = $('#checkin_policy > p:nth-child(2) > span')
    .text()
    .trim();
  const checkInExtra = $('#checkin_policy > p.hp-checkin-extra').text().trim();
  const checkOutHours = $('#checkout_policy > p:nth-child(2) > span')
    .text()
    .trim();
  const creditCardPaymentPossible = isCreditCardPaymentPossible(html);
  const description = $('#property_description_content')
    .text()
    .replace(/\n/g, ' ')
    .trim();
  const frontDesk24H = !!$(
    '#hp_facilities_box .facilitiesChecklist .facilitiesChecklistSection[data-section-id="3"] ul li',
  )
    .text()
    .includes('24');
  const image = parseImages(html);
  const name = $('#hp_hotel_name').text().split('\n')[2]?.trim();

  const location = await fetchCoordinates(address);

  return createHotel({
    amenities,
    breakfast,
    checkInExtra,
    checkInHours,
    checkOutHours,
    creditCardPaymentPossible,
    description,
    frontDesk24H,
    image,
    location: {
      address,
      latitude: Number(location?.lat),
      longitude: Number(location?.lon),
    },
    name,
  });
};

export default scrapeBooking;

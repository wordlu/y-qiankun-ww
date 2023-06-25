import React from 'react';
import show from '../components/ShowInfo';

export default async param => {
  const { events } = param;
  const [, record, , column] = events;
  show({ data: record, column });
};
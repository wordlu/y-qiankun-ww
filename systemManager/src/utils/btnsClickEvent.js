export function btnsClickEvent(state, params, { mutations, getState }) {
  const { events } = params;
  mutations[events[0].eventsName]();
}

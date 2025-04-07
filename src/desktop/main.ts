((PLUGIN_ID) => {
  kintone.events.on(['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'], (event) => {
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);

    return event;
  });

  kintone.events.on(['app.record.index.edit.submit', 'app.record.create.submit', 'app.record.edit.submit'], (event) => {
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);

    return event;
  });
})(kintone.$PLUGIN_ID);

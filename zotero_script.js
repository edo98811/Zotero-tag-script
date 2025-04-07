
if (!items.length) return;

for (const item of items) {
    const collections = await item.getCollections(); // Get collections the item belongs to
    if (collections.length === 0) continue; // Skip if no collection

    for (const collectionID of collections) {
        const collection = Zotero.Collections.get(collectionID);
        if (!collection) continue;

        const collectionName = collection.name;
        if (!collectionName) continue;

        // Check if the tag already exists
        let tags = item.getTags().map(tag => tag.tag);
        if (!tags.includes(collectionName)) {
            await item.addTag(collectionName);
            await item.saveTx(); // Save changes
            Zotero.debug(`Added tag '${collectionName}' to item '${item.getField('title')}'`);
        }
    }
}
package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("v7ga8m74krd9zct")
		if err != nil {
			return err
		}

		// add
		new_department := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "1855q94t",
			"name": "department",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"collectionId": "hi9rr1udf3na2so",
				"cascadeDelete": true
			}
		}`), new_department)
		collection.Schema.AddField(new_department)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("v7ga8m74krd9zct")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("1855q94t")

		return dao.SaveCollection(collection)
	})
}

package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "hi9rr1udf3na2so",
			"created": "2023-01-28 06:09:19.687Z",
			"updated": "2023-01-28 06:09:19.687Z",
			"name": "departments",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "npfbejkz",
					"name": "name",
					"type": "text",
					"required": true,
					"unique": true,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				}
			],
			"listRule": null,
			"viewRule": null,
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("hi9rr1udf3na2so")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}

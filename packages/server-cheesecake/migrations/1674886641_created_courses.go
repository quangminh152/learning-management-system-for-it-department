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
			"id": "narak07qcl3ekdk",
			"created": "2023-01-28 06:17:21.748Z",
			"updated": "2023-01-28 06:17:21.748Z",
			"name": "courses",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "osqbgqua",
					"name": "name",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "vmwja1fx",
					"name": "credit",
					"type": "number",
					"required": true,
					"unique": false,
					"options": {
						"min": 1,
						"max": 10
					}
				},
				{
					"system": false,
					"id": "fjdh8gtx",
					"name": "major",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"collectionId": "v7ga8m74krd9zct",
						"cascadeDelete": false
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

		collection, err := dao.FindCollectionByNameOrId("narak07qcl3ekdk")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}

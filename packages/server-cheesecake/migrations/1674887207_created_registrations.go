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
			"id": "c0z4a2libhm32iu",
			"created": "2023-01-28 06:26:47.384Z",
			"updated": "2023-01-28 06:26:47.384Z",
			"name": "registrations",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "dbkip1fd",
					"name": "student",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"collectionId": "_pb_users_auth_",
						"cascadeDelete": false
					}
				},
				{
					"system": false,
					"id": "klezdmae",
					"name": "class",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"collectionId": "zcr9igpnnm9v5s8",
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

		collection, err := dao.FindCollectionByNameOrId("c0z4a2libhm32iu")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}

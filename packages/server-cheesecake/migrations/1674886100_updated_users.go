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

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		collection.Name = "students"

		// add
		new_studentID := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "zr6tfeaf",
			"name": "studentID",
			"type": "text",
			"required": true,
			"unique": true,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_studentID)
		collection.Schema.AddField(new_studentID)

		// add
		new_field := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "o5rgniff",
			"name": "field",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_field)
		collection.Schema.AddField(new_field)

		// add
		new_last_name := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "plepp4v3",
			"name": "last_name",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_last_name)
		collection.Schema.AddField(new_last_name)

		// add
		new_phone := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "bs38hrb3",
			"name": "phone",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": 10,
				"max": 10,
				"pattern": ""
			}
		}`), new_phone)
		collection.Schema.AddField(new_phone)

		// add
		new_shcd_dk := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "qyn77t5w",
			"name": "shcd_dk",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_shcd_dk)
		collection.Schema.AddField(new_shcd_dk)

		// add
		new_shcd_gk1 := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "byopfjqi",
			"name": "shcd_gk1",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_shcd_gk1)
		collection.Schema.AddField(new_shcd_gk1)

		// add
		new_shcd_gk2 := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "p3lb8tyg",
			"name": "shcd_gk2",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_shcd_gk2)
		collection.Schema.AddField(new_shcd_gk2)

		// add
		new_shcd_ck := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "bugqzfdf",
			"name": "shcd_ck",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_shcd_ck)
		collection.Schema.AddField(new_shcd_ck)

		// add
		new_majorID := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "d6y2tdxu",
			"name": "majorID",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_majorID)
		collection.Schema.AddField(new_majorID)

		// update
		edit_first_name := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "users_name",
			"name": "first_name",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_first_name)
		collection.Schema.AddField(edit_first_name)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		collection.Name = "users"

		// remove
		collection.Schema.RemoveField("zr6tfeaf")

		// remove
		collection.Schema.RemoveField("o5rgniff")

		// remove
		collection.Schema.RemoveField("plepp4v3")

		// remove
		collection.Schema.RemoveField("bs38hrb3")

		// remove
		collection.Schema.RemoveField("qyn77t5w")

		// remove
		collection.Schema.RemoveField("byopfjqi")

		// remove
		collection.Schema.RemoveField("p3lb8tyg")

		// remove
		collection.Schema.RemoveField("bugqzfdf")

		// remove
		collection.Schema.RemoveField("d6y2tdxu")

		// update
		edit_first_name := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "users_name",
			"name": "name",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_first_name)
		collection.Schema.AddField(edit_first_name)

		return dao.SaveCollection(collection)
	})
}

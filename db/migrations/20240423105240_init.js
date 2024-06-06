// /**
//  * @param {import("knex").Knex} knex
//  * @returns {Promise<void>}
//  */
// exports.up = function(knex) {
//   return knex.schema
//     .createTable('users', table => {
//       table.increments('id');
//       table.bigInteger('number').notNullable().unique();
//       // table.string('email').notNullable().unique();
//       table.integer('pin').notNullable();
//       table.timestamps(true, true);
//     })
//     .createTable('registrations', table => {
//       table.increments('id');
//       table.string('name').notNullable();
//       table.string('email').notNullable().unique();
//       table.string('password').notNullable();
//       table.timestamps(true, true);
//     })
//     .createTable('partners', table => {
//       table.increments('id');
//       table.string('name').notNullable();
//       table.string('contact_info').notNullable();
//       table.string('address').notNullable();
//     })
//     .createTable('zones', table => {
//       table.increments('id');
//       table.integer('partner_id').unsigned().references('id').inTable('partners').onDelete('CASCADE');
//       table.string('name').notNullable();
//       table.string('type');
//       table.text('geo_location_data');
//     })
//     .createTable('locations', table => {
//       table.increments('location_id');
//       table.integer('zone_id').unsigned().references('id').inTable('zones').onDelete('CASCADE');
//       table.decimal('latitude', 9, 6);
//       table.decimal('longitude', 9, 6);
//       table.text('geo_polygon');
//     })
//     .createTable('formElements', table => {
//       table.increments('elementId');
//       table.string('elementLabel').notNullable();
//       table.enum('elementType', ['text', 'checkbox', 'radio', 'switch']).notNullable();
//       table.boolean('isRequired').notNullable();
//       table.timestamps(true, true);
//     })
//     .createTable('formOptions', table => {
//       table.increments('id');
//       table.integer('element_id').unsigned().references('elementId').inTable('formElements').onDelete('CASCADE');
//       table.string('optionText').notNullable();
//       table.string('optionValue').notNullable();
//       // table.enum('type', ['text', 'checkbox', 'radio', 'switch']).notNullable();
//       table.timestamps(true, true);
//     });
// };
// /**
//  * @param {import("knex").Knex} knex
//  * @returns {Promise<void>}
//  */
// exports.down = function(knex) {
//   return knex.schema
//     .dropTableIfExists('formOptions') // Drop formOptions table first
//     .dropTableIfExists('formElements')
//     .dropTableIfExists('locations')

//     .dropTableIfExists('zones')
//     .dropTableIfExists('partners')

//     .dropTableIfExists('users')
//     .dropTableIfExists('registrations');
// };

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
// exports.up = function(knex) {
//   return knex.schema
//     .createTable('users', table => {
//       table.increments('id');
//       table.bigInteger('number').notNullable().unique();
//       table.integer('pin').notNullable();
//       table.timestamps(true, true);
//     })
//     .createTable('registrations', table => {
//       table.increments('id');
//       table.string('name').notNullable();
//       table.string('email').notNullable().unique();
//       table.string('password').notNullable();
//       table.timestamps(true, true);
//     })
//     .createTable('partners', table => {
//       table.increments('id');
//       table.string('name').notNullable();
//       table.string('contact_info').notNullable();
//       table.string('address').notNullable();
//     })
//     .createTable('zones', table => {
//       table.increments('id');
//       table.integer('partner_id').unsigned().references('id').inTable('partners').onDelete('CASCADE');
//       table.string('name').notNullable();
//       table.string('type');
//       table.text('geo_location_data');
//     })
//     .createTable('locations', table => {
//       table.increments('location_id');
//       table.decimal('latitude', 9, 6);
//       table.decimal('longitude', 9, 6);
//       table.text('geo_polygon');
//       table.string('name').notNullable().unique();
//       table.integer('zone_id').unsigned().references('id').inTable('zones').onDelete('CASCADE'); // Add this line
//     })
//     .createTable('zone_locations', table => {
//       table.integer('zone_id').unsigned().references('id').inTable('zones').onDelete('CASCADE');
//       table.integer('location_id').unsigned().references('location_id').inTable('locations').onDelete('CASCADE');
//       table.primary(['zone_id', 'location_id']);
//     })
//     .createTable('formElements', table => {
//       table.increments('elementId');
//       table.string('elementLabel').notNullable();
//       table.enum('elementType', ['text', 'checkbox', 'radio', 'switch']).notNullable();
//       table.boolean('isRequired').notNullable();
//       table.timestamps(true, true);
//     })
//     .createTable('formOptions', table => {
//       table.increments('id');
//       table.integer('element_id').unsigned().references('elementId').inTable('formElements').onDelete('CASCADE');
//       table.string('optionText').notNullable();
//       table.string('optionValue').notNullable();
//       table.timestamps(true, true);
//     });
// };

// /**
//  * @param {import("knex").Knex} knex
//  * @returns {Promise<void>}
//  */
// exports.down = function(knex) {
//   return knex.schema
//     .dropTableIfExists('formOptions') // Drop formOptions table first
//     .dropTableIfExists('formElements')
//     .dropTableIfExists('zone_locations') // Drop zone_locations table next
//     .dropTableIfExists('locations')
//     .dropTableIfExists('zones')
//     .dropTableIfExists('partners')
//     .dropTableIfExists('users')
//     .dropTableIfExists('registrations');
// };

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("users", table => {
            // table.increments('id');
            // table.bigInteger('number').notNullable().unique();
            // table.integer('pin').notNullable();
            // table.timestamps(true, true);
            table.increments("id");
            table.bigInteger("number").notNullable().unique();
            table.integer("pin").notNullable();
            table.timestamps(true, true);
        })
        .createTable("registrations", table => {
            table.increments("id");
            table.string("name").notNullable();
            table.string("email").notNullable().unique();
            table.string("password").notNullable();
            table.timestamps(true, true);
        })
        .createTable("partners", table => {
            table.increments("id");
            table.string("name").notNullable();
            table.string("contactInfo").notNullable();
            table.string("address").notNullable();
        })
        .createTable("zones", table => {
            table.increments("id");
            table.integer("partner_id").unsigned().references("id").inTable("partners").onDelete("CASCADE");
            table.string("name").notNullable();
            table.string("type");
            table.string("geo_location_data");
        })
        .createTable("locations", table => {
            table.increments("location_id");
            table.decimal("latitude", 9, 6);
            table.decimal("longitude", 9, 6);
            table.string("geoPolygon");
            table.string("name").notNullable();
            // table.integer("zone_id").unsigned().references("id").inTable("zones").onDelete("CASCADE");
        })
        .createTable("zone_locations", table => {
            table.integer("zone_id").unsigned().references("id").inTable("zones").onDelete("CASCADE");
            table.integer("location_id").unsigned().references("location_id").inTable("locations").onDelete("CASCADE");
            table.primary(["zone_id", "location_id"]);
        })
        .createTable("formElements", table => {
            table.increments("elementId");
            table.string("elementLabel").notNullable();
            table.enum("elementType", ["text", "checkbox", "radio", "switch"]).notNullable();
            table.boolean("isRequired").notNullable();
            table.timestamps(true, true);
        })
        .createTable("formOptions", table => {
            table.increments("id");
            table.integer("element_id").unsigned().references("elementId").inTable("formElements").onDelete("CASCADE");
            table.string("optionText").notNullable();
            table.string("optionValue").notNullable();
            table.timestamps(true, true);
        });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("formOptions")
        .dropTableIfExists("formElements")
        .dropTableIfExists("zone_locations")
        .dropTableIfExists("locations")
        .dropTableIfExists("zones")
        .dropTableIfExists("partners")
        .dropTableIfExists("users")
        .dropTableIfExists("registrations");
};

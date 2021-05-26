import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1614706815865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable( new Table({
        name:'images',
        columns:[
          {
            name:'id',
            type:'integer',
            unsigned: true,
            isPrimary:true,
            isGenerated:true,
            generationStrategy:'increment'
          },

          {
            name:'path',
            type:'VARCHAR'
          },

          {
            name:'kennel_id',
            type:'integer'
          }
          
        ],

        foreignKeys:[{
          name:'ImageKennel',

          columnNames:['kennel_id'],

          referencedTableName:'kennels',

          referencedColumnNames:['id'],

          onUpdate:'CASCADE',

          onDelete:'CASCADE'
        }]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('images')
    }

}

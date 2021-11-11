import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpecificationsCars1636640184784
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "carId",
            type: "uuid",
          },
          {
            name: "specificationId",
            type: "uuid",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKSpecificationCar",
            referencedTableName: "specifications",
            referencedColumnNames: ["id"],
            columnNames: ["specificationId"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKCarSpecification",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["carId"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("specifications_cars");
  }
}

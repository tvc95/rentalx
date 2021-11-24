import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentals1637759806784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "carId",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "userId",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "startDate",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "endDate",
            type: "timestamp",
          },
          {
            name: "expectedReturnDate",
            type: "timestamp",
          },
          {
            name: "total",
            type: "numeric",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCarRental",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["carId"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKUserRental",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["userId"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rentals");
  }
}

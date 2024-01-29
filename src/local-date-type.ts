import { LocalDate } from "@js-joda/core";
import { type EntityProperty, type Platform, Type } from "@mikro-orm/core";

export class LocalDateType extends Type<LocalDate | null, string | null> {
    public convertToDatabaseValue(value: LocalDate | string | null): string | null {
        if (!value) {
            return null;
        }

        if (typeof value === "string") {
            return value;
        }

        return value.toString();
    }

    public convertToJSValue(value: LocalDate | string | null): LocalDate | null {
        if (!value) {
            return null;
        }

        if (value instanceof LocalDate) {
            return value;
        }

        return LocalDate.parse(value);
    }

    public override compareAsType(): string {
        return "string";
    }

    public override getColumnType(prop: EntityProperty, platform: Platform): string {
        return platform.getDateTypeDeclarationSQL(prop.length);
    }
}

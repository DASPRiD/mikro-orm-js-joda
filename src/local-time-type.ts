import { LocalTime } from "@js-joda/core";
import { type EntityProperty, type Platform, Type } from "@mikro-orm/core";

export class LocalTimeType extends Type<LocalTime | null, string | null> {
    public convertToDatabaseValue(value: LocalTime | string | null): string | null {
        if (!value) {
            return null;
        }

        if (typeof value === "string") {
            return value;
        }

        return value.toString();
    }

    public convertToJSValue(value: LocalTime | Date | string | null): LocalTime | null {
        if (!value) {
            return null;
        }

        if (value instanceof LocalTime) {
            return value;
        }

        if (value instanceof Date) {
            return LocalTime.of(value.getHours(), value.getMinutes(), value.getSeconds());
        }

        return LocalTime.parse(value);
    }

    public override compareAsType(): string {
        return "string";
    }

    public override getColumnType(prop: EntityProperty, platform: Platform): string {
        return platform.getTimeTypeDeclarationSQL(prop.length);
    }
}

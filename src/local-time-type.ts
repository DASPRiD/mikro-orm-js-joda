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

    public convertToJSValue(value: LocalTime | string | null): LocalTime | null {
        if (!value) {
            return null;
        }

        if (value instanceof LocalTime) {
            return value;
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

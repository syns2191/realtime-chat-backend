export declare const citext: {
    (): import("drizzle-orm/pg-core").PgCustomColumnBuilder<{
        name: "";
        dataType: "custom";
        columnType: "PgCustomColumn";
        data: string;
        driverParam: unknown;
        enumValues: undefined;
    }>;
    <TConfig extends Record<string, any>>(fieldConfig?: TConfig | undefined): import("drizzle-orm/pg-core").PgCustomColumnBuilder<{
        name: "";
        dataType: "custom";
        columnType: "PgCustomColumn";
        data: string;
        driverParam: unknown;
        enumValues: undefined;
    }>;
    <TName extends string>(dbName: TName, fieldConfig?: unknown): import("drizzle-orm/pg-core").PgCustomColumnBuilder<{
        name: TName;
        dataType: "custom";
        columnType: "PgCustomColumn";
        data: string;
        driverParam: unknown;
        enumValues: undefined;
    }>;
};
export declare const dateFields: {
    createdAt: import("drizzle-orm").NotNull<import("drizzle-orm", { with: { "resolution-mode": "import" } }).HasDefault<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"created_at">>>;
    updatedAt: import("drizzle-orm").NotNull<import("drizzle-orm", { with: { "resolution-mode": "import" } }).HasDefault<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"updated_at">>>;
};
//# sourceMappingURL=common.d.ts.map
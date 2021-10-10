import { DenoDB } from "../deps.ts";
import { assertEquals } from "../dev_deps.ts";
import { CreateConnection, getMetadataStorage } from "../mod.ts";
import { Article } from "./samples/articles.ts";

Deno.test("Testing sample", async () => {
  const connector = new DenoDB.SQLite3Connector({
    filepath: "./database.sqlite",
  });

  const db = await CreateConnection(connector, {
    models: [Article],
  });
  await connector.close();
  await db.close();

  const metadata = getMetadataStorage();

  assertEquals(metadata._entities.length, 1);
  assertEquals(metadata._entities[0].target, Article);
});
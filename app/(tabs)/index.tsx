import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  const recipes = [
    { name: "Nasi" },
    { name: "Bubur" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>

      <View style={styles.linkGroup}>
        <Link href="/recipe" style={styles.navLink}>
          Navigate to Recipe
        </Link>
      </View>

      <Text style={styles.sectionTitle}>List Recipe</Text>

      <View style={styles.recipeList}>
        {recipes.map((recipe, index) => (
          <Link
            key={index}
            href={{
              pathname: '/recipe/[id]',
              params: { id: index.toString() }
            }}
            style={styles.recipeItem}
          >
            Recipe ke {index + 1}: {recipe.name}
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1a1a1a",
  },
  linkGroup: {
    marginBottom: 24,
    gap: 12,
  },
  navLink: {
    fontSize: 18,
    color: "#1e88e5", // nice blue
    textDecorationLine: "underline",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  recipeList: {
    width: "100%",
    gap: 12,
  },
  recipeItem: {
    fontSize: 16,
    color: "#0277bd",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f0f9ff",
    borderRadius: 8,
    textAlign: "center",
  },
});

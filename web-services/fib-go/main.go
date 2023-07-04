package main
import "github.com/gofiber/fiber/v2"
import "os"
import "fmt"

func fibonacci(n uint) uint {
	if n < 2 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}


func main() {
  app := fiber.New()

  app.Get("/", func(c *fiber.Ctx) error {
    return c.JSON(fiber.Map{
      "result": fibonacci(30),
    })
  })

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

  app.Listen(fmt.Sprintf(":%s", port))
}

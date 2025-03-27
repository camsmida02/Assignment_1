export class Order {
  constructor(sFrom) {
      this.sFrom = sFrom;
      this.isDone = false;
      this.orderDetails = {
          pizzaType: null,
          size: null,
          soda: false
      };

      this.OrderState = {
          WELCOMING: "WELCOMING",
          CHOOSING_PIZZA: "CHOOSING_PIZZA",
          CHOOSING_SIZE: "CHOOSING_SIZE",
          OFFERING_SODA: "OFFERING_SODA",
          CONFIRMING: "CONFIRMING"
      };

      this.stateCur = this.OrderState.WELCOMING;
  }

  handleInput(sInput) {
      let aReturn = [];
      let input = sInput.toLowerCase().trim();

      switch (this.stateCur) {
          case this.OrderState.WELCOMING:
              aReturn.push("Welcome to Cam's Pizza.");
              aReturn.push("Would you like to place an order? (yes/no)");
              this.stateCur = this.OrderState.CHOOSING_PIZZA;
              break;

          case this.OrderState.CHOOSING_PIZZA:
              if (input.startsWith('y')) {
                  aReturn.push('Would you like a pepperoni or cheese pizza?');
              } else {
                  aReturn.push("Thanks for visiting. Maybe next time!");
                  this.isDone = true;
              }
              this.stateCur = this.OrderState.CHOOSING_SIZE;
              break;

          case this.OrderState.CHOOSING_SIZE:
              if (input.startsWith('p') || input.startsWith('c')) {
                  this.orderDetails.pizzaType = input;
                  aReturn.push('Small or Medium?');
                  this.stateCur = this.OrderState.OFFERING_SODA;
              } else {
                  aReturn.push("Please select either 'pepperoni' or 'cheese'.");
              }
              break;

          case this.OrderState.OFFERING_SODA:
              if (input.startsWith('s') || input.startsWith('m')) {
                  this.orderDetails.size = input;
                  aReturn.push('Would you like to add a bottle of soda for $2? (yes/no)');
                  this.stateCur = this.OrderState.CONFIRMING;
              } else {
                  aReturn.push("Please choose 'Small' or 'Medium'.");
              }
              break;

          case this.OrderState.CONFIRMING:
              if (input.startsWith('y')) {
                  this.orderDetails.soda = true;
                  aReturn.push("Great, a bottle of soda has been added!");
              }
              aReturn.push(`Your order: ${this.orderDetails.size} ${this.orderDetails.pizzaType} pizza.`);
              if (this.orderDetails.soda) {
                  aReturn.push("Soda included.");
              }
              aReturn.push("Thank you for your order!");
              this.isDone = true;
              break;
      }

      return aReturn;
  }

  isDone() {
      return this.isDone;
  }
}
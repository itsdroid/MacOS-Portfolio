
public class practice {

    public static void main(String args[]) {
        int n = 145;
        int copy = n;
        int result = 0;

        while (n > 0) {
            int dig = n % 10;
            int fact = 1;
            for (int i = 1; i <= dig; i++) {
                fact = fact * i;
            }
            result = result + fact;
            n = n / 10;
        }

        if (result == copy) {
            System.out.println("Strong number");
        } else {
            System.out.println("Not strong number");
        }
    }
}

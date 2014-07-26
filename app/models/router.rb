#does the routing
class Router

  def initialize calculator
    @calculator = calculator
  end
  def map input
    case input[0]
      when "add"
        @calculator.+(input[1])
      when "sub"
        @calculator.-(input[1])
      when "mul"
        @calculator.*(input[1])
      when "div"
        @calculator./(input[1])
      when "cancel"
        @calculator.reset()
      else
       "Incorrect command"
    end
  end
end
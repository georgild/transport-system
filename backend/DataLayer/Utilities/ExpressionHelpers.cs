using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Utilities {
    public static class ExpressionHelpers {

        public static Expression<Func<TInput, bool>> CombineWithAnd<TInput>(this Expression<Func<TInput, bool>> func1, Expression<Func<TInput, bool>> func2) {
            if (func1 == null)
                return func2;

            return Expression.Lambda<Func<TInput, bool>>(
                Expression.And(
                    func1.Body, new ExpressionParameterReplacer(func2.Parameters, func1.Parameters).Visit(func2.Body)),
                func1.Parameters);
        }
        public static Expression<Func<TInput, bool>> CombineWithAndAlso<TInput>(this Expression<Func<TInput, bool>> func1, Expression<Func<TInput, bool>> func2) {
            if (func1 == null)
                return func2;

            return Expression.Lambda<Func<TInput, bool>>(
                Expression.AndAlso(
                    func1.Body, new ExpressionParameterReplacer(func2.Parameters, func1.Parameters).Visit(func2.Body)),
                func1.Parameters);
        }

        public static Expression<Func<TInput, bool>> CombineWithOrElse<TInput>(this Expression<Func<TInput, bool>> func1, Expression<Func<TInput, bool>> func2) {
            if (func1 == null)
                return func2;

            return Expression.Lambda<Func<TInput, bool>>(
                Expression.OrElse(
                    func1.Body, new ExpressionParameterReplacer(func2.Parameters, func1.Parameters).Visit(func2.Body)),
                func1.Parameters);
        }

        public static Expression<Func<TInput, bool>> CombineWithOr<TInput>(this Expression<Func<TInput, bool>> func1, Expression<Func<TInput, bool>> func2) {
            if (func1 == null)
                return func2;

            return Expression.Lambda<Func<TInput, bool>>(
                Expression.Or(
                    func1.Body, new ExpressionParameterReplacer(func2.Parameters, func1.Parameters).Visit(func2.Body)),
                func1.Parameters);
        }

        public static Expression<Func<TInput, bool>> Not<TInput>(this Expression<Func<TInput, bool>> func1) {
            return Expression.Lambda<Func<TInput, bool>>(Expression.Not(func1.Body),
                                        func1.Parameters);
        }

        private class ExpressionParameterReplacer : ExpressionVisitor {
            public ExpressionParameterReplacer(IList<ParameterExpression> fromParameters, IList<ParameterExpression> toParameters) {
                ParameterReplacements = new Dictionary<ParameterExpression, ParameterExpression>();
                for (int i = 0; i != fromParameters.Count && i != toParameters.Count; i++)
                    ParameterReplacements.Add(fromParameters[i], toParameters[i]);
            }

            private IDictionary<ParameterExpression, ParameterExpression> ParameterReplacements { get; set; }

            protected override Expression VisitParameter(ParameterExpression node) {
                ParameterExpression replacement;
                if (ParameterReplacements.TryGetValue(node, out replacement))
                    node = replacement;
                return base.VisitParameter(node);
            }
        }
    }
}
